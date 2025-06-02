 export const tiltCardStyle = () => {
       const card = document.getElementById("tiltCard");
if (!card) return;

   
const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X relative to card
      const y = e.clientY - rect.top;  // mouse Y relative to card

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // max tilt in degrees
      const maxTilt = 15;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    const resetTilt = () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    };

    
 const handleMouseLeave = () => {
      resetTilt();
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };


};
``
export default tiltCardStyle;