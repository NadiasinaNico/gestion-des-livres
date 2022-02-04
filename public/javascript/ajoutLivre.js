
function afficher() {

  const ajoutForm = document.querySelector("#ajoutForm");

  ajoutForm.removeAttribute("class");

}

function sup(){
  return(
    confirm("voulez vous supprimer ?")
  )
}