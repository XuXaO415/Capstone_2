import * as React from "react";
import { Link, NavLink, Switch, Route, Redirect } from "react-router-dom";

/** Profile form
 *
 * Shows profile info and form.
 *
 * Routed as /profile
 *
 * App -> Routes -> ProfileForm
 *
 * Controlled component?
 *
 * State: { formData } where formData is: object of user info, e.g. { username, first_name, last_name, email, image_url, hobbies, interests, city, country, zipCode, latitude, longitude}
 * - formDataErrors: object of errors for each field in form data, e.g. {username: "Username required"}
 * - saveConfirmed: boolean, true when form has been saved
 * - formErrors: array of error messages from server, e.g. ["Invalid username", "Invalid password"]
 * - loading: boolean, true while waiting for API to return
 * - notFound: boolean, true if username doesn't exist
 * - currentUser: array of objects with user info [{ username, first_name, last_name, email, image_url, hobbies, interests, city, country, zipCode, latitude, longitude}]
 *
 *
 * Context:
 * - currentUser (from UserContext): array of objects with user info [{ username, first_name, last_name, email, image_url, hobbies, interests, city, country, zipCode, latitude, longitude}]
 *
 *
 */

function ProfileForm() {
  return (
    <div className="ProfileForm">
      <h1>Profile</h1>
      <p>Profile form goes here</p>
    </div>
  );
}

export default ProfileForm;
