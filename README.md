# [StoriesApp_GoogleAuth]

![stories](https://raw.githubusercontent.com/ControlAltTea/StoriesApp_GoogleAuth/main/images/StoriesApp.gif?token=GHSAT0AAAAAABUXB62D5NN2IIEFSS5OS7Z6YYD5O2A)

Using OOP, this web app allows you to compare multiple timezones. Each clock is in 12-hour time, starting with Japan.

## Tech Used : ![HANDLEBARS](https://img.shields.io/badge/-HBS-orange?style=for-the-badge&logo=appveyor)![CSS](https://img.shields.io/badge/-CSS-green?style=for-the-badge&logo=appveyor)![Javascript](https://img.shields.io/badge/-Javascript-blue?style=for-the-badge&logo=appveyor)

Using Handlebars (.hbs), CSS, and JavaScript, the user is able to create stories including a title, category (private, public, and uncategorized). These stories, depending on the category will be displayed in different sections. Public stories will be available to both the user and anyone with a link to the user's public stories page, based on their user ID. Their private stories however are only accessible via the specific user's dashboard.

Most importantly, the user will be able to log in using Google authorization. Currently, the users are placed in a testing authorization via their emails, so to utilize this feature, ensure to navigate throguh Google Cloud to incorporate yours or another's email.

As long as the user is logged in correctly, each feature will rely on the individual user's ObjectId stored on MongoDB in the users export. You may test this with multiple emails.

## Optimizations

Originally his was an execires in CSS animations. It then was recreated in iterations using if/else statements, constructor functions and eventually a single class.

## Lessons Learned

How to incorporate Google Authorization, addressing various routes between pages. How to prioritize said routes by working through each step of CRUD, with a delete method being the final step.
