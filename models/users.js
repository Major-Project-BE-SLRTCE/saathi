const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = Schema({
  // common fields
  accountCreationDate: {
    type: Date,
    default: new Date(),
  },
  lastOnline: {
    type: Date,
  },
  avatar: {
    isExists: {
      type: Boolean,
      default: "false",
    },
    imageLink: {
      type: String,
      trim: true,
      default: null,
    },
  },
  //-- need to define a suitable user type for general user
  //-- currently setting it as "chatter"
  userType: {
    type: String, // chatter or doctor
    required: [true, "User type is required."],
    enum: {
      values: ["chatter", "doctor"],
      message: "User type must be either chatter or doctor.",
    },
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: [3, "Username must contain at least 3 characters."],
    maxlength: [20, "Username must contain at most 20 characters."],
    required: [true, "Username is required."],
    //-- username should not start with a digit, "." and "_".
    match: [/^[a-z0-9_.]+$/, "Username must contain only letters and numbers."],
    validate: {
      validator: async (value) => {
        await User.findOne({ username: value })
          .then((user) => {
            if (user) {
              return false; // value is not unique or already exist
            } else {
              return true;
            }
          })
          .catch((err) => {
            console.log("Error:\n" + err);
            return false;
          });
      },
      message: "Username already exist.",
    },
  },
  name: {
    type: String,
    trim: true,
    minlength: [3, "Name must contain at least 3 characters."],
    maxlength: [60, "Name must contain at most 60 characters."],
    required: [true, "Name is required."],
    match: [/^[a-zA-Z ]+$/, "Name must contain only letters and spaces."],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Email is required."],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email is not valid.",
    ],
    // unique: [true, "Email address already exist."]
    validate: {
      validator: (value) => {
        return new Promise((resolve, reject) => {
          User.findOne({ email: value }, (err, user) => {
            if (err) {
              reject(
                new Error("An error occurred while checking for duplicates")
              );
            } else if (user) {
              reject(
                new Error(
                  "The email already exists. Please choose a different one."
                )
              );
            } else {
              resolve(true);
            }
          });
        });
      },
      message: "Email address already exist.",
    },
  },
  gender: {
    type: String,
    enum: {
      //-- check gender once
      values: ["male", "female", "non-binary", "other"],
      message: "Choose a valid gender.",
    },
  },
  password: {
    type: String,
    minlength: [8, "Password must contain at least 8 characters."],
    maxlength: [30, "Password must contain at most 30 characters."],
    required: [true, "Password is required."],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
    ],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiryTime: {
    type: Number,
  },
  // fields only for patients
  //-- check DOB once
  dob: {
    type: Date,
    match: [
      /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/,
      "Date of birth must be in dd/mm/yyyy format.",
    ],
  },
  occupation: {
    type: String,
    enum: {
      values: [
        "architect",
        "boxer",
        "builder",
        "businessman",
        "cameraman",
        "carpenter",
        "clown",
        "construction worker",
        "dentist",
        "detective",
        "diver",
        "doctor",
        "doorman",
        "electrician",
        "engineer",
        "farmer",
        "fireman",
        "flight attendant",
        "footballer",
        "foreman",
        "forest ranger",
        "gardener",
        "geisha",
        "housekeeper",
        "housewife",
        "journalist",
        "librarian",
        "lifeguard",
        "magician",
        "mechanic",
        "nurse",
        "painter",
        "paramedic",
        "photographer",
        "pilot",
        "pirate",
        "police",
        "pope",
        "postman",
        "priest",
        "professor",
        "repairman",
        "reporter",
        "salesman",
        "scientist",
        "secretary",
        "singer",
        "soldier",
        "student",
        "surgeon",
        "train conductor",
        "waiter",
        "other",
      ],
      message: "Choose a valid occupation.",
    },
  },
  pincode: {
    type: String,
    match: [/^[0-9]{6}$/, "Pincode must contain only 6 digits."],
  },
  totalDaysChatted: {
    type: Number,
  },
  longestChattingStreak: {
    // should be updated everytime when a user starts chatting
    type: Number, // in number of days
  },
  averageChattingTime: {
    //-- define logic for it
    type: Number, // in minutes
  },
  // fields only for doctors
  specialization: {
    type: String,
    enum: {
      values: [
        "art therapist",
        "family and marriage counselor",
        "mental health counselor",
        "psychiatric nurse",
        "psychiatrist",
        "psychoanalyst",
        "psychologist",
        "psychotherapist",
      ],
      message: "Choose a valid specialization.",
    },
  },
  experience: {
    type: Number, // in years
    match: [/^[0-9]+$/, "Experience must contain only numbers."],
  },
  numberOfConsultations: {
    //-- define logic for it
    type: Number,
  },
  rating: {
    type: Number,
  },
  address: {
    baseAddress: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 200,
    },
    city: String,
    state: String,
    country: String,
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Pincode must contain only 6 digits."],
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must contain only 10 digits."],
      validate: {
        validator: (value) => {
          return User.findOne({ phone: value })
            .then((user) => {
              if (user) {
                return false; // value is not unique or already exist
              } else {
                return true;
              }
            })
            .catch((err) => {
              console.log("Error:\n" + err);
              return false;
            });
        },
        message: "Phone number already exist.",
      },
    },
  },
});

const User = model("users", userSchema);
module.exports = User;
