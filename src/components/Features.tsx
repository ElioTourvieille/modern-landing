import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const BentoTilt = ({ children , className = "" }: Props ) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef<HTMLDivElement>(null);
  
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current) return;
  
      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();
  
      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;
  
      const tiltX = (relativeY - 0.5) * 5;
      const tiltY = (relativeX - 0.5) * -5;
  
      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
      setTransformStyle(newTransform);
    };
  
    const handleMouseLeave = () => {
      setTransformStyle("");
    };
  
    return (
      <div
        ref={itemRef}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
      >
        {children}
      </div>
    );
  };

const BentoCard = ({
  src,
  title,
  description,
}: {
  src: string;
  title: React.ReactNode;
  description: string;
  isComingSoon?: boolean;
}) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        autoPlay
        muted
        loop
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-32">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Dans la strate du métagame
          </p>

          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Plongez dans un univers riche et en constante expansion, où une
            multitude de produits vibrants convergent pour créer une expérience
            superposée et interconnectée à votre monde.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radi<b>an</b>t
              </>
            }
            description="Une application métagame multiplateforme, transformant vos activités à travers les jeux Web2 et Web3 en une aventure gratifiante."
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="Une collection de NFT inspirée par l'anime et le gaming - une propriété intellectuelle prête pour l'expansion."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="Un hub social gamifié, ajoutant une nouvelle dimension ludique aux interactions sociales pour les communautés Web3."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="Un agent IA interdimensionnel - élevant votre gameplay pour le rendre plus amusant et productif."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
