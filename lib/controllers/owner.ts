import { Owner } from "lib/models/owner";
import { resend } from "lib/resend";
import { cloudinary } from "lib/cloudinary";

async function CreateOwner(body) {
  const cleanEmail = body.email.trim().toLocaleLowerCase();

  const img = await cloudinary.uploader.upload(body.picURL, {
    resource_type: "image",
    discard_original_filename: true,
    width: 500,
    height: 500,
  });

  const [foundOwner, newOwner] = await Owner.findOrCreate({
    where: { email: cleanEmail },
    defaults: {
      email: body.email,
      type: body.type,
      business: body.business,
      services: body.services,
      other: body.other,
      picURL: img.secure_url,
      lat: body.lat,
      lng: body.lng,
    },
  });

  if (newOwner) {
    const msg = {
      from: "onboarding@resend.dev",
      to: "nicolascasmuz@gmail.com",
      subject: `Bienvenido/a ${body.business}`,
      html: `<p>Gracias por registrarte en Patagonia Trip</p>
             <h3>¡Ya publicamos tu negocio!</h3>
             <h3>A partir de ahora viajeros de todo el mundo podrán verlo a través de nuestro sitio</h3>`,
    };

    resend.emails.send(msg);

    return { message: "owner was successfully created", foundOwner };
  } else {
    return { message: "owner already exists", foundOwner };
  }
}

async function getOwners() {
  const missingPets = await Owner.findAll({});

  return missingPets;
}

export { CreateOwner, getOwners };
