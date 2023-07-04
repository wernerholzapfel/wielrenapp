ng build --prod
firebase deploy --only hosting

android app:


ng build --configuration production
npx cap sync android
npx cap sync ios

firebase deploy --only hosting
