import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period")

periods.forEach((period) => {
    period.addEventListener("click", async (event) => {

        try {

            if(event.target && event.target.classList.contains("cancel-icon")) {
                //obtém a li pai do elemento clicado
                const item = event.target.closest("li")
    
                //pega o id do agendamento para remoção
                const { id } = item.dataset;
                
    
                //confirma o evento de remoção
                if (id) {
                    const isConfirm = confirm(
                        "Tem deseja que vai cancelar?"
                    )
    
                    if (isConfirm) {
                        await scheduleCancel({id})
                        schedulesDay()
                    }
                }
    
            }
            
        } catch (error) {
            console.error("Erro ao processar o cancelamento:", error);
        }

      
    })
})