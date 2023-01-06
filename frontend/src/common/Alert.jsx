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

function Alert({ type, messages }) {
  if (!messages) return null;
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert alert-${type}`}>
      {messages.map((m) => (
        <p className="mb-0 small" key={m}>
          {m}
        </p>
      ))}
    </div>
  );
}

export default Alert;
