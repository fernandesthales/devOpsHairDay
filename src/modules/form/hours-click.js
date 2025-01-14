export function hoursClick() {
    const hours = document.querySelectorAll('.hour-available');

    hours.forEach((available) => {
        
        available.addEventListener("click", (selected) => {

            //Removendo a classe hour selected de todas as que já foram selecionadas
            hours.forEach((hour) => {
                hour.classList.remove("hour-selected")
            })
            //Adicionar a classe de hora selecionada
            selected.target.classList.add("hour-selected")
        })
    })

}