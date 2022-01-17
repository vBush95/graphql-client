import React from "react";
import { aliasQuery, aliasMutation } from "../../utils/graphql-test-utils";

<reference types="cypress" />;

const registerKey = "FlowWaffles";

describe("Register-Form Test", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3000/graphql", (req) => {
      // Queries
      //aliasQuery(req, "getUsers");

      // Mutations
      aliasMutation(req, "registerValidateKey");
      aliasMutation(req, "registerValidateEmail");
      aliasMutation(req, "registerValidateUsername");
      aliasMutation(req, "registerValidatePassword");
      aliasMutation(req, "register");
    });
  });
  it("connect to page", () => {
    cy.visit("http://localhost:3000/");
  });
  it("load elements", () => {
    cy.contains("Create Account");
    cy.contains("Register-Key");
    cy.contains("Email");
    cy.contains("Username");
    cy.contains("Password");
  });
  it("Register-Key Input Transitions", () => {
    cy.get("input#registerKey")
      .type(registerKey, { delay: 100 })
      .should("have.value", registerKey)
      .intercept("/graphql")
      .as("registerKeyResponse1")
      .wait("@registerKeyResponse1")
      .then((interception) => {
        if (interception.response.body.data.registerValidateKey) {
          cy.log("register Key is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.wait(2100)
      .get("input#registerKey")
      .type("{backspace}", { delay: 2100 })
      .type("{del}{selectall}{backspace}", {
        delay: 1100,
      });

    cy.get("input#registerKey").type("FlowWaffl", { delay: 100 });
    cy.wait(2100);
    cy.get("input#registerKey")
      .type("es", { delay: 100 })
      .should("have.value", registerKey)
      .intercept("/graphql")
      .as("registerKeyResponse2")
      .wait("@registerKeyResponse2")
      .then((interception) => {
        if (interception.response.body.data.registerValidateKey) {
          cy.log("register Key is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.wait(1100);

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).includes("The Register-Key is not valid.");
      // return false to prevent the error from
      // failing this test
      return false;
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
  });
  it("Continue Button Register-Key disabled", () => {
    cy.get("input#registerKey").type("{del}{selectall}{backspace}");

    cy.get("button#registerKeyButton").should("be.disabled");
    cy.wait(1100);
    cy.get("input#registerKey").type("FlowWWWW", { delay: 100 });
    cy.wait(2100);
    cy.get("button#registerKeyButton").should("be.disabled");

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).includes("The Register-Key is not valid.");
      // return false to prevent the error from
      // failing this test
      return false;
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
  });
  it("Continue Button Register-Key enabled", () => {
    cy.get("input#registerKey").type("{del}{selectall}{backspace}", {
      delay: 200,
    });
    cy.get("input#registerKey").type(registerKey, { delay: 100 });
    cy.wait(2100);
    cy.get("button#registerKeyButton").should("be.enabled");
  });
  it("Click Register-Key Button", () => {
    cy.get("button#registerKeyButton").click();
  });

  it("Email-Input Transitions", () => {
    cy.get("input#email")
      .type("test@email.com", { delay: 100 })
      .should("have.value", "test@email.com")
      .intercept("/graphql")
      .as("emailResponse1")
      .wait("@emailResponse1")
      .then((interception) => {
        if (interception.response.body.data.email) {
          cy.log("email is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.wait(2100)
      .get("input#email")
      .type("{backspace}{backspace}", { delay: 100 });
    cy.get("button#registerEmailButton").should("be.disabled");
    cy.wait(2100);
    cy.get("input#email").type("{del}{selectall}{backspace}", {
      delay: 1100,
    });

    cy.get("input#email").type("test@email", { delay: 100 });
    cy.get("button#registerEmailButton").should("be.disabled");
    cy.wait(2100);
    cy.get("input#email")
      .type(".com", { delay: 100 })
      .should("have.value", "test@email.com")
      .intercept("/graphql")
      .as("emailResponse2")
      .wait("@emailResponse2")
      .then((interception) => {
        if (interception.response.body.data.email) {
          cy.log("email is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.get("button#registerEmailButton").should("be.enabled");
    cy.wait(1100);

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).includes("Please enter a valid E-Mail address.");

      // return false to prevent the error from
      // failing this test
      return false;
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
  });
  it("Click Email Button", () => {
    cy.get("button#registerEmailButton").click();
  });
  it("Username Input Transitions", () => {
    cy.get("input#username")
      .type("firstUser2", { delay: 100 })
      .should("have.value", "firstUser2")
      .intercept("/graphql")
      .as("usernameResponse1")
      .wait("@usernameResponse1")
      .then((interception) => {
        if (interception.response.body.data.username) {
          cy.log("Username is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.get("button#registerUsernameButton").should("be.enabled");
    cy.wait(2100).get("input#username").type("{backspace}", { delay: 2100 });
    cy.get("button#registerUsernameButton").should("be.disabled");
    cy.get("input#username").type("{del}{selectall}{backspace}", {
      delay: 1100,
    });
    cy.get("button#registerUsernameButton").should("be.disabled");

    cy.get("input#username").type("firstUser", { delay: 100 });
    cy.wait(2100);
    cy.get("button#registerUsernameButton").should("be.disabled");
    cy.get("input#username")
      .type("2", { delay: 100 })
      .should("have.value", "firstUser2")
      .intercept("/graphql")
      .as("usernameResponse2")
      .wait("@usernameResponse2")
      .then((interception) => {
        if (interception.response.body.data.username) {
          cy.log("Username is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.get("button#registerUsernameButton").should("be.enabled");
    cy.wait(1100);

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).includes("Username is already taken");
      // return false to prevent the error from
      // failing this test
      return false;
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
  });
  it("Click Username Button", () => {
    cy.get("button#registerUsernameButton").click();
  });
  it("Password Input Transitions", () => {
    cy.get("input#password")
      .type("password", { delay: 100 })
      .should("have.value", "password")
      .intercept("/graphql")
      .as("passwordResponse1")
      .wait("@passwordResponse1")
      .then((interception) => {
        if (interception.response.body.data.password) {
          cy.log("Password is valid");
        }
        //console.log("interceptioon", interception);
      });
    cy.get("i#showpassword").click();
    cy.get("button#registerPasswordButton").should("be.disabled");
    cy.wait(2100);
    cy.get("input#confirmPassword").type("passwor", { delay: 100 });
    cy.get("button#registerPasswordButton").should("be.disabled");
    cy.get("input#password").type("{del}{selectall}{backspace}", {
      delay: 1100,
    });
    cy.get("i#showconfirmPassword").click();
    cy.get("button#registerPasswordButton").should("be.disabled");

    cy.get("input#password").type("password123", { delay: 100 });
    cy.get("i#hidepassword").click();
    cy.get("i#hideconfirmPassword").click();
    cy.wait(2100);
    cy.get("i#showpassword").click();
    cy.get("i#showconfirmPassword").click();
    cy.get("input#confirmPassword")
      .type("d123", { delay: 100 })
      .should("have.value", "password123")
      .intercept("/graphql")
      .as("passwordResponse2")
      .wait("@passwordResponse2")
      .then((interception) => {
        if (
          interception.response.body.data.confirmPassword &&
          interception.response.body.data.password
        ) {
          cy.log("PasswordsMatch");
        }
        //console.log("interceptioon", interception);
      });
    cy.get("button#registerPasswordButton").should("be.enabled");
    cy.wait(1100);

    cy.on("uncaught:exception", (err, runnable) => {
      expect(err.message).includes("Passwords do not match.");
      // return false to prevent the error from
      // failing this test
      return false;
      // we still want to ensure there are no other unexpected
      // errors, so we let them fail the test
    });
  });
  it("Click Password Button", () => {
    cy.get("button#registerPasswordButton").click();
  });
  it("Registration Succesfull", () => {
    cy.contains("Registration successful!");
  });
});
