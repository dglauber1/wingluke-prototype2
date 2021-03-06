import { referenceDescription } from "../schemaGlobals";

export default {
  name: "tour",
  title: "Tour",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "localeString",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "A slug is the identifying part of the URL of this tour's web page. Use the 'Generate' button to set it to a unique ID based on the Title field. Once this is set on a published, public page, do not change it.",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      type: "string",
      title: "Tour Type",
      options: {
        list: ["Neighborhood Tour", "Museum Tour", "Literary Tour", "No type"],
        layout: "radio",
        direction: "horizontal",
      },
    },
    {
      name: "overview",
      title: "Overview",
      type: "localePortableText",
      description: "Provide a short (3-5 sentence) overview of this tour.",
      // TODO validation: required?
    },
    {
      name: "banner",
      title: "Banner",
      type: "figure",
      description: "Provide a banner image for this tour.",
    },
    /*     {
      name: "isDropIn",
      title: "Runs on a Public Drop-In Schedule",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "Checked if this tour is open for public drop-in on a set schedule (e.g. Historic Hotel Tour, CDT, etc.)",
      fieldset: "bookingOptions",
    },
    {
      name: "isPrivate",
      title: "Can Be Booked for Private Groups",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "Checked if this tour can be booked privately by educators, families, business groups, etc.",
      fieldset: "bookingOptions",
    },
    {
      name: "isSchoolTour",
      title: "Can Be Booked for School Groups",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "Checked if this tour can be booked privately by large school groups",
      fieldset: "bookingOptions",
    },
    {
      name: "isSpecial",
      title: "Special Tour",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "Checked if this is a special tour that is scheduled for a specific day of the year",
      fieldset: "bookingOptions",
    },
    {
      name: "availableVirtual",
      title: "Available Virtually",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description: "Checked if this tour can be taken virtually",
      fieldset: "bookingOptions",
    }, */
    // TODO add validation such that schedulingInfo and other fields is requried if isPublic is true

    {
      name: "scheduleType",
      title: "Schedule Type",
      type: "string",
      options: {
        list: [
          {
            title:
              "Finite Tour Occurrences (this tour only occurs on a single date or on a finite number of specific dates - e.g. JART tour or a limited Food Walk series)",
            value: "finite",
          },
          {
            // TODO add another example
            title:
              "Repeating Tour Occurrences (this tour runs on a set schedule and has many occurrences - e.g. Virtual Historic Hotel Tour every Thursday)",
            value: "repeating",
          },
          {
            title: "Do not show this tour on calendar (unscheduled)",
            value: "unscheduled",
          },
        ],
        layout: "radio",
      },
      fieldset: "calendarOptions",
    },
    {
      name: "finiteOccurrences",
      title: "Finite Tour Occurrences Details",
      type: "eventOccurrences",
      options: {
        collapsible: true,
      },
      description:
        "If this tour occurs on a finite number of specific dates, please add all such occurrences here.",
      fieldset: "calendarOptions",
      // TODO validation (may need to be document-level validation) include instructions: "please click dropdown arrow"
    },
    {
      name: "repeatingOccurrences",
      title: "Repeating Tour Occurrences Details",
      type: "schedulingInfo",
      options: {
        collapsible: true,
      },
      description:
        "If this tour runs on a repeating schedule, please provide details for that schedule here.",
      fieldset: "calendarOptions",
      // TODO validation (may need to be document-level validation)
    },
    {
      name: "scheduleDetails",
      title: "Schedule Details",
      description:
        '(Optional) Provide any additional details about this tour\'s schedule here. E.g. "Runs every hour on the half hour" for the HHT.',
      type: "string",
      fieldset: "calendarOptions",
    },
    {
      name: "bookingLink",
      title: "Booking Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ["https", "http"],
        }),
      description:
        "If visitors may register or purchase tickets for this tour online, please provide the corresponding Altru or ticketing engine link.",
      fieldset: "bookingOptions",
    },
    {
      name: "privateGroupContact",
      title: "Private Group Booking Contact",
      type: "localePortableText",
      options: {
        collapsible: true,
      },
      description:
        "If this tour can be privately booked for private groups, please provide contact details (e.g. 'If you would like to schedule a private tour for your family, business, or friend group, contact tours@wingluke.org or 206.623.5124 ext 133').",
      fieldset: "bookingOptions",
    },
    {
      name: "schoolGroupContact",
      title: "School Group Booking Contact",
      type: "localePortableText",
      options: {
        collapsible: true,
      },
      description:
        "If this tour can be booked for school groups, please provide contact details (e.g. 'If you would like to schedule a tour for your school group, contact tours@wingluke.org or 206.623.5124 ext 133').",
      fieldset: "bookingOptions",
    },
    {
      // TODO make into object that includes a url streamLink field
      name: "virtualOptions",
      title: "Virtual Options",
      type: "localePortableText",
      description:
        "If this tour may be taken virtually, please provide details for the logistics of the virtual tour.",
      options: {
        collapsible: true,
      },
      // fieldset: "bookingOptions",
    },
    {
      name: "imageGallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid",
      },
      // TODO description...what types of images are in this field?
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
      description:
        "Please provide the maximum number of people that can attend this tour",
      validation: (Rule) => Rule.integer().positive(),
    },
    {
      name: "recommendedAudience",
      title: "Recommended Audience",
      type: "localeString",
      description: 'e.g. "6th grade and up" or "All ages"',
    },
    /*     {
      name: "recommendedAudience",
      title: "Recommended Audience",
      type: "localeString",
      description: "e.g. All ages",
    }, */
    {
      name: "goesOffsite",
      title: "Goes Offsite",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
      description:
        "Checked if this tour goes to sites outside of museum facilities.",
    },
    {
      name: "featuredSites",
      title: "Featured Sites",
      type: "array",
      of: [{ type: "reference", to: [{ type: "historicSite" }] }],
      description:
        "Please provide 1-3 featured sites that this tour will visit. " +
        referenceDescription("historic site"),
    },
    {
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      description: "Provide how long this tour lasts in minutes.",
      validation: (Rule) => Rule.positive(),
    },
    {
      name: "walkingDistance",
      title: "Walking Distance (miles)",
      type: "number",
      description:
        "Provide the distance in miles tourists will need to walk on this tour.",
      validation: (Rule) => Rule.positive(),
    },
    {
      name: "accessibilityInfo",
      title: "Accessibility Info",
      type: "localePortableText",
      description:
        "Provide details about accessibility concerns (e.g. wheelchair accessibility, visual/hearing impairment accessibility, dietary restrictions for food tours, etc.) for this tour.",
    },
    {
      name: "educationGuides",
      title: "Tour/Education Guides",
      type: "array",
      of: [{ type: "reference", to: [{ type: "staffMember" }] }],
      description:
        "Please provide all staff members that may act as education guide for this tour. " +
        referenceDescription("staff member"),
    },
    {
      name: "pricingDetails",
      title: "Pricing Details",
      type: "localePortableText",
      description: "Please provide pricing details for this tour.",
    },
    {
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      of: [{ type: "faq" }],
    },
    {
      name: "sponsors",
      title: "Sponsors",
      type: "sponsorList",
      options: {
        collapsible: true,
      },
    },
    {
      name: "specialTourResources",
      title: "Special Tour Resources",
      // TODO is this the right type for this field?
      type: "localePortableText",
      description:
        "If this is a special tour that provides pre-reading for visitors, provide that information here in the form of either text or links.",
    },
  ],
  fieldsets: [
    {
      name: "calendarOptions",
      title: "Calendar Scheduling Options",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "bookingOptions",
      title: "Booking Options",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "subtitle.en",
      media: "banner",
    },
  },
};
