import ashik from "@/public/images/developer (1).jpg";
import Image from "next/image";

export default function About() {
  //   throw new Error("its an error");
  return (
    <div>
      <h3>About page</h3>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
        exercitationem sed doloremque architecto quae accusamus incidunt amet
        minima praesentium ad fugiat, autem vel sit tenetur odit commodi quaerat
        ut illum?
      </p>

      <div style={{ width: "300px" }}>
        <Image
          src={ashik}
          alt="Ashik"
          quality={100}
          style={{
            width: "100%",
            height: "auto",
          }}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
