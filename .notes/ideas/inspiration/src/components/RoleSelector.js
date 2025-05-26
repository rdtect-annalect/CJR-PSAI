/**
 * Manages role selection functionality
 */
import { BaseComponent } from "./BaseComponent.js";
import { DOMUtils } from "../utils/DOMUtils.js";
import { Constants } from "../utils/Constants.js";

export class RoleSelector extends BaseComponent {
  /**
   * @param {object} config - Configuration for role selector
   * @param {string} config.scheduleText - Text for scheduling a call
   */
  constructor(config) {
    super({
      roleTagSelector: ".role-tag",
      selectedRolesContainerId: "selectedRoles",
      selectedRolesInputId: "selectedRolesInput",
      selectedRolesWrapperSelector: ".selected-roles-wrapper",
      messageTextareaId: "message",
      requestRolesBtnId: "requestSelectedRolesBtn",
      defaultCtaSelector: ".default-cta",
      selectRolesBtnId: "selectRolesBtn",
      contactFormId: "contact-form",
      scheduleCallBtnId: "scheduleCallBtn",
      contactSectionId: "contact",
      roleInputSelector: ".role-input",
      ...config,
    });
    this.scheduleText = config.scheduleText;
    this.selectedRoles = [];
    this.scheduleCallActive = false;

    // DOM Elements - will be initialized in init()
    this.roleInputs = null;
    this.selectedRolesContainer = null;
    this.selectedRolesInput = null;
    this.selectedRolesWrapper = null;
    this.messageTextarea = null;
    this.requestRolesBtn = null;
    this.defaultCta = null;
    this.selectRolesBtn = null;
    this.contactForm = null;
    this.scheduleCallBtn = null;
  }

  /**
   * Initialize role selection functionality
   */
  init() {
    super.init();

    // Initialize all DOM elements using config values
    this.roleInputs = document.querySelectorAll(this.config.roleInputSelector);
    this.selectedRolesContainer = document.getElementById(
      this.config.selectedRolesContainerId
    );
    this.selectedRolesInput = document.getElementById(
      this.config.selectedRolesInputId
    );
    this.selectedRolesWrapper = document.querySelector(
      this.config.selectedRolesWrapperSelector
    );
    this.messageTextarea = document.getElementById(
      this.config.messageTextareaId
    );
    this.requestRolesBtn = document.getElementById(
      this.config.requestRolesBtnId
    );
    this.defaultCta = document.querySelector(this.config.defaultCtaSelector);
    this.selectRolesBtn = document.getElementById(this.config.selectRolesBtnId);
    this.contactForm = document.getElementById(this.config.contactFormId);
    this.scheduleCallBtn = document.getElementById(
      this.config.scheduleCallBtnId
    );

    if (!this.areRequiredElementsPresent()) return;

    // Initialize event listeners
    this.initRoleEventListeners();
    this.initContactFormHandler();
    this.initScheduleCall();
    this.initRequestRolesButton();

    // Publish initialization complete
    this.publish("roleSelectorInitialized", { component: this });
  }

  /**
   * Check if required DOM elements are present
   * @returns {boolean} True if all required elements are present
   * @private
   */
  areRequiredElementsPresent() {
    return (
      this.roleInputs.length &&
      this.selectedRolesContainer &&
      this.selectedRolesInput
    );
  }

  /**
   * Initialize role selection event listeners
   * @private
   */
  initRoleEventListeners() {
    // Use event delegation for role tags when possible
    if (this.selectedRolesContainer) {
      this.addSafeEventListener(this.selectedRolesContainer, "click", (e) => {
        const roleTag = e.target.closest(this.config.roleTagSelector);
        if (roleTag) {
          this.handleRoleTagRemoval(roleTag);
        }
      });

      // Add keyboard accessibility for role tags container
      this.addSafeEventListener(this.selectedRolesContainer, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const roleTag = e.target.closest(this.config.roleTagSelector);
          if (roleTag) {
            e.preventDefault();
            this.handleRoleTagRemoval(roleTag);
          }
        }
      });
    }

    // Add event listeners to role checkboxes
    this.roleInputs.forEach((input) => {
      this.addSafeEventListener(input, "change", () => {
        this.handleRoleCheckboxChange(input);
      });
    });
  }

  /**
   * Handle role checkbox change
   * @param {HTMLElement} input - The changed checkbox input
   * @private
   */
  handleRoleCheckboxChange(input) {
    const roleText = input.getAttribute(Constants.ATTRIBUTES.DATA_ROLE);

    if (input.checked) {
      if (!this.selectedRoles.includes(roleText)) {
        this.selectedRoles.push(roleText);
      }
    } else {
      this.selectedRoles = this.selectedRoles.filter(
        (role) => role !== roleText
      );
    }

    this.updateSelectedRoles();
  }

  /**
   * Handle role tag removal
   * @param {HTMLElement} roleTag - The role tag element
   * @private
   */
  handleRoleTagRemoval(roleTag) {
    // Get the role text (first text node of the role tag)
    const roleText = Array.from(roleTag.childNodes)
      .find((node) => node.nodeType === Node.TEXT_NODE)
      ?.nodeValue?.trim();

    if (!roleText) return;

    // Find the corresponding checkbox and uncheck it
    const checkbox = Array.from(this.roleInputs).find(
      (input) => input.getAttribute(Constants.ATTRIBUTES.DATA_ROLE) === roleText
    );

    if (checkbox) {
      checkbox.checked = false;
      // Filter out this role
      this.selectedRoles = this.selectedRoles.filter((r) => r !== roleText);
      this.updateSelectedRoles();
    }
  }

  /**
   * Update the UI and hidden input based on selected roles
   * @private
   */
  updateSelectedRoles() {
    // Update UI based on whether roles are selected
    this.updateRoleSelectionUI();

    // Update hidden input for form submission
    this.selectedRolesInput.value = this.selectedRoles.join(", ");

    // Update the message if auto-filled or empty
    this.updateMessageIfAutoFilled();
  }

  /**
   * Update UI based on role selection state
   * @private
   */
  updateRoleSelectionUI() {
    if (this.selectedRoles.length === 0) {
      this.handleNoRolesSelected();
    } else {
      this.handleRolesSelected();
    }
  }

  /**
   * Handle UI updates when no roles are selected
   * @private
   */
  handleNoRolesSelected() {
    this.selectedRolesContainer.textContent = Constants.TEXT.NO_ROLES_SELECTED;
    this.selectedRolesWrapper.classList.remove(
      Constants.CSS_CLASSES.HAS_SELECTIONS
    );

    // Toggle buttons visibility
    if (this.requestRolesBtn) {
      this.requestRolesBtn.classList.add(Constants.CSS_CLASSES.HIDDEN);
      this.defaultCta?.classList.remove(Constants.CSS_CLASSES.HIDDEN);
    }

    // Show the select roles button in the contact form
    if (this.selectRolesBtn) {
      this.selectRolesBtn.classList.remove(Constants.CSS_CLASSES.HIDDEN);
    }
  }

  /**
   * Handle UI updates when roles are selected
   * @private
   */
  handleRolesSelected() {
    // Show selected roles as tags
    this.selectedRolesContainer.innerHTML = "";
    this.selectedRoles.forEach((role) => {
      const roleTag = this.createRoleTag(role);
      this.selectedRolesContainer.appendChild(roleTag);
    });
    this.selectedRolesWrapper.classList.add(
      Constants.CSS_CLASSES.HAS_SELECTIONS
    );

    // Toggle CTA buttons in expertise section
    if (this.requestRolesBtn) {
      this.requestRolesBtn.classList.remove(Constants.CSS_CLASSES.HIDDEN);
      this.defaultCta?.classList.add(Constants.CSS_CLASSES.HIDDEN);

      // Update count in button
      const countElement =
        this.requestRolesBtn.querySelector(".selected-count");
      if (countElement) {
        countElement.textContent = `(${this.selectedRoles.length})`;
      }
    }

    // Hide the select roles button in contact form since roles are already selected
    if (this.selectRolesBtn) {
      this.selectRolesBtn.classList.add(Constants.CSS_CLASSES.HIDDEN);
    }
  }

  /**
   * Update message content if it's auto-filled or empty
   * @private
   */
  updateMessageIfAutoFilled() {
    if (!this.messageTextarea) return;

    const isAutoFilled = this.isMessageAutoFilled();

    if (isAutoFilled) {
      let rolesText = "";
      if (this.selectedRoles.length > 0) {
        const rolesList = this.selectedRoles.join(", ");
        rolesText = Constants.TEXT.ROLES_DETAIL_TEMPLATE.replace(
          "{{roles}}",
          rolesList
        );
      }

      this.updateMessageContent(rolesText);
    }
  }

  /**
   * Check if message is auto-filled or empty
   * @returns {boolean} True if the message is auto-filled or empty
   * @private
   */
  isMessageAutoFilled() {
    if (!this.messageTextarea) return false;

    return (
      this.messageTextarea.value === "" ||
      this.messageTextarea.value.startsWith(Constants.TEXT.ROLES_PREFIX) ||
      this.messageTextarea.value.includes(this.scheduleText)
    );
  }

  /**
   * Create a role tag element
   * @param {string} role - The role text
   * @returns {HTMLElement} - The role tag element
   * @private
   */
  createRoleTag(role) {
    return DOMUtils.createElement(
      "span",
      {
        classList: ["role-tag"],
        tabindex: "0",
        role: "button",
        "aria-label": `Remove ${role} role`,
      },
      [
        role,
        DOMUtils.createElement(
          "span",
          {
            classList: ["remove-tag"],
            "aria-hidden": "true",
          },
          "×"
        ),
      ]
    );
  }

  /**
   * Initialize contact form submit handler
   * @private
   */
  initContactFormHandler() {
    if (!this.contactForm) return;

    this.addSafeEventListener(this.contactForm, "submit", (e) => {
      // Here you would typically handle form submission
      console.log("Form submitted with roles:", this.selectedRoles);

      // Show a success message (for demo purposes)
      if (!e.defaultPrevented) {
        // This will only run if the form is actually being submitted
        alert(Constants.TEXT.FORM_SUBMIT_MESSAGE);
      }
    });
  }

  /**
   * Initialize the schedule call button functionality
   * @private
   */
  initScheduleCall() {
    if (!this.scheduleCallBtn || !this.messageTextarea) return;

    this.addSafeEventListener(this.scheduleCallBtn, "click", () => {
      // Toggle the schedule call state
      this.scheduleCallActive = !this.scheduleCallActive;

      // Update button appearance and text to indicate active state
      this.updateScheduleCallButton();

      // Get any existing roles text from the message
      const rolesText = this.extractRolesTextFromMessage();

      // Update message based on both states (roles and schedule)
      this.updateMessageContent(rolesText);

      // Focus the message textarea
      setTimeout(() => {
        this.messageTextarea.focus();
      }, Constants.TIMING.MESSAGE_FOCUS_DELAY);
    });
  }

  /**
   * Update schedule call button state
   * @private
   */
  updateScheduleCallButton() {
    if (this.scheduleCallActive) {
      this.scheduleCallBtn.classList.add(Constants.CSS_CLASSES.ACTIVE);
      this.scheduleCallBtn.textContent =
        Constants.TEXT.SCHEDULE_CALL_BUTTON_ACTIVE_TEXT;
    } else {
      this.scheduleCallBtn.classList.remove(Constants.CSS_CLASSES.ACTIVE);
      this.scheduleCallBtn.textContent =
        Constants.TEXT.SCHEDULE_CALL_BUTTON_TEXT;
    }
  }

  /**
   * Extract roles text from message textarea
   * @returns {string} The roles text portion of the message
   * @private
   */
  extractRolesTextFromMessage() {
    if (!this.messageTextarea) return "";

    let rolesText = "";
    if (this.messageTextarea.value.startsWith(Constants.TEXT.ROLES_PREFIX)) {
      // Extract just the roles part if present
      rolesText = this.messageTextarea.value.split("\n\n")[0];
    }

    return rolesText;
  }

  /**
   * Initialize the request roles button functionality
   * @private
   */
  initRequestRolesButton() {
    const contactSection = document.getElementById(
      this.config.contactSectionId
    );

    if (!this.requestRolesBtn || (!this.contactForm && !contactSection)) return;

    this.addSafeEventListener(this.requestRolesBtn, "click", (e) => {
      e.preventDefault();
      // Prefer scrolling to the form, fallback to section
      const target = this.contactForm || contactSection;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          if (this.messageTextarea) this.messageTextarea.focus();
        }, Constants.TIMING.SCROLL_ANIMATION_DELAY);
      }
    });
  }

  /**
   * Update message content based on both roles and schedule call status
   * @param {string} rolesText - The text about selected roles
   * @private
   */
  updateMessageContent(rolesText) {
    if (!this.messageTextarea) return;

    if (this.scheduleCallActive && rolesText) {
      // Both roles and schedule call
      this.messageTextarea.value =
        rolesText + "\n\nAdditionally, " + this.scheduleText.toLowerCase();
    } else if (this.scheduleCallActive) {
      // Only schedule call, no roles
      this.messageTextarea.value = this.scheduleText;
    } else if (rolesText) {
      // Only roles, no schedule call
      this.messageTextarea.value = rolesText;
    } else {
      // Neither roles nor schedule call
      this.messageTextarea.value = "";
    }
  }

  /**
   * Reset the role selection state
   */
  reset() {
    // Reset checkboxes
    this.roleInputs.forEach((input) => {
      input.checked = false;
    });

    // Reset schedule call button
    if (this.scheduleCallBtn) {
      this.scheduleCallActive = false;
      this.scheduleCallBtn.classList.remove(Constants.CSS_CLASSES.ACTIVE);
      this.scheduleCallBtn.textContent =
        Constants.TEXT.SCHEDULE_CALL_BUTTON_TEXT;
    }

    // Reset request button
    if (this.requestRolesBtn) {
      this.requestRolesBtn.classList.add(Constants.CSS_CLASSES.HIDDEN);
      const countSpan = this.requestRolesBtn.querySelector(".selected-count");
      if (countSpan) countSpan.textContent = "(0)";
    }

    // Clear message textarea if it contains auto-generated content
    if (this.messageTextarea && this.isMessageAutoFilled()) {
      this.messageTextarea.value = "";
    }

    // Reset selected roles
    this.selectedRoles = [];
    this.updateSelectedRoles();

    // Publish reset event
    this.publish("roleSelectorReset", { component: this });
  }

  /**
   * Clean up the component, removing event listeners
   */
  destroy() {
    // Call parent destroy to clean up event listeners
    super.destroy();
  }
}
