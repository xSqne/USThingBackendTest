const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();


router.get('/hkust', (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send('Email query parameter is required');
  }

  // Start scraping the HKUST faculty listing page
  axios.get('https://facultyprofiles.hkust.edu.hk/facultylisting.php')
    .then(response => {
      const $ = cheerio.load(response.data);
      let profileLink = null;

      // Loop through each contact div to find the email
      $('div.contact').each((index, element) => {
        const emailElement = $(element).find('a[href^="mailto:"]');

        // Check if the email is found in the contact div
        if (emailElement.length > 0 && emailElement.attr('href').includes(email)) {
          const viewProfileElement = $(element).find('a.profile-link');

          // Check if the view profile link is found
          if (viewProfileElement.length > 0) {
            profileLink = viewProfileElement.attr('href');
            return false; // Break the loop once the profile link is found
          }
        }
      });

      // Return the profile link if found
      if (profileLink) {
        let url = 'https://facultyprofiles.hkust.edu.hk/' + profileLink;
        res.send({url});

      } else {
        res.status(404).send('Profile not found');
      }
    }).catch(error => {
      res.status(500).send('An unknown error occurred while fetching the profile');
    });
});

router.get('/hkust-gz', (req, res) => {
  res.send(req.query);
});

module.exports = router;