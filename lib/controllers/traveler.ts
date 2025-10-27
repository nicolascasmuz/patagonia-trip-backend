import { Traveler } from "lib/models/traveler";
import { resend } from "lib/resend";

async function CreateTraveler(body) {
  const cleanEmail = body.email.trim().toLocaleLowerCase();

  const [foundTraveler, newTraveler] = await Traveler.findOrCreate({
    where: { email: cleanEmail },
    defaults: {
      name: body.name,
      email: body.email,
      vehicle: body.vehicle,
    },
  });

  if (newTraveler) {
    const msg = {
      from: "onboarding@resend.dev",
      to: "nicolascasmuz@gmail.com",
      subject: `Bienvenido/a ${body.name}`,
      html: `<p>Gracias por registrarte en Patagoning, a partir de ahora recibirás info sobre:</p>
             <h3>- Actualizaciones en nuestra plataforma.</h3>
             <h3>- Nuevos alojamientos y servicios.</h3>
             <h3>- Habilitación de nuevas rutas.</h3>
             <h3>- Inconvenientes para viajar.</h3>`,
    };

    resend.emails.send(msg);

    return { message: "traveler was successfully created", newTraveler };
  } else {
    return { message: "traveler already exists", foundTraveler };
  }
}

export { CreateTraveler };
