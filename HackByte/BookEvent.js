let lname = document.getElementById("lname");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let date = document.getElementById("date");
let budget = document.getElementById("budget");
let loc = document.getElementById("loc");
let guests = document.getElementById("guests");
let Venue = document.getElementById("Venue");
let comment = document.getElementById("comment");
const submit = document.getElementById("submit");

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  let ebody = `
   
    <br>
    <p>Dear ${name.value},

    We hope this message finds you well. On behalf of the entire team at BlissfulBonds , we want to express our heartfelt gratitude for choosing us to host your upcoming event. We are thrilled to be a part of your special occasion and are committed to making it a memorable experience for you and your guests.<br>
    
    Your trust in our services means the world to us, and we are dedicated to ensuring that every detail of your event exceeds your expectations. Our team is already hard at work, preparing to deliver a seamless and enjoyable experience for you and your guests.<br>
    
    As we get to know by your request, Your event is scheduled for ${date.value} at ${loc.value} and you choose the venue at ${Venue.value} with a budget of 
    ${budget.value}. We are excited to be a part of your special day and are committed to making it a memorable experience for you and your ${guests.value} guests.<br>

    If you have any specific requests or preferences rather than "${comment.value}" you would like us to consider, please feel free to reach out to our customer service team at satchidananda26212@gmail.com . We are here to assist you in any way we can.<br>
    
    For the latest updates and information about your event, please visit our website at www.blissfulbonds.com. We will also be in touch with you regularly in you contact number ${phone.value} or in your emial ${lname.value} to keep you informed about the progress of your event planning.<br>

    Once again, thank you for choosing BlissfulBonds. We look forward to hosting your event and making it an unforgettable celebration.<br>
    
    Best regards,
    
    Ravi Kumar
    BlissfulBonds
    satchidananda26212@gmail.com</p>
    `;

  Email.send({
    SecureToken: "5d675ef2-bfd1-405e-bd43-2da4aed07191", //add your token here
    To: lname.value,
    From: "satchidananda26212@gmail.com",
    Subject: "Thank You for Booking Your Event with Us!",
    Body: ebody,
  }).then((message) => alert(message));
});
