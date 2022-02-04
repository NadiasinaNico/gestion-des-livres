const auteurAfficher = () => {
  const ajoutFormAuteur = document.querySelector("#formAjoutAuteur");
  ajoutFormAuteur.removeAttribute("class");
};

const suprimer = () => {
  return (
    confirm("voulez vous supprimer?")
  )
}