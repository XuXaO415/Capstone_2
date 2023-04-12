import React from "react";

/* Renders a bootstrap alert.
 *
 * Receives an alert type (info, warning, danger, success) and a message.
 * Can also receive a boolean to hide the alert.
 *
 * App -> Routes -> LoginForm -> Alert
 * App -> Routes -> SignupForm -> Alert
 * App -> Routes -> ProfileForm -> Alert
 * */

function Alert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default Alert;
