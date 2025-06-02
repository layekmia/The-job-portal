// import { Webhook } from "svix";
// import User from '../models/User.js';

// Api controller function to Manage clerk user with database;

// Clerk webhooks are automated notifications that Clerk sends to your backend server when important events happen, such as:
// Event	Description
// user.created	A new user signs up
// user.updated	User profile is updated
// user.deleted	User account is deleted
// session.created	A user logs in
// session.ended	A user logs out

// export const clerkWebhooks = async (req, res) => {
//     try {
//         // create a svix instance with clerk webhook secret;
//         const webhook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

//         // verifying headers;
//         await webhook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
        
//         });

//         // Getting data from request body;
//         const {data, type} = req.body;
        
//         // switch Cases for different events;
//         switch(type){
//             case 'user.created': {
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     image: data.image_url,
//                     resume: ''
//                 }
//                 await User.create(userData) // shortcut of below syntax;
//                 // const user = new User(userData);
//                 // user.save();
//                 res.json({});
//                 break;
//             }
//             case 'user.updated': {
//                 // user can update their name image and email;
//                  const userData = {
//                     email: data.email_addresses[0].email_address,
//                     name: data.first_name + ' ' + data.last_name,
//                     image: data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData);
//                 res.json();
//                 break;
//             } 
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id);
//                 res.json({});
//                 break;
//             }
//             default:
//                 break;
//         }

//     }catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: 'Webhooks Error'})
//     }
// }

import { Webhook } from "svix";
import User from '../models/User.js';

export const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body; // raw buffer
    const headers = req.headers;

    // Create a new Svix webhook instance using the secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);

    // Verify and parse the incoming webhook
    const evt = webhook.verify(payload, {
      "svix-id": headers["svix-id"],
      "svix-timestamp": headers["svix-timestamp"],
      "svix-signature": headers["svix-signature"]
    });

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res.status(200).json({ success: true, message: "User created" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ success: true, message: "User deleted" });
        break;
      }

      default:
        res.status(200).json({ success: true, message: "Unhandled event" });
        break;
    }

  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).json({ success: false, message: "Webhook verification failed" });
  }
};
 