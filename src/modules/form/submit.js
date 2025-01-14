import dayjs from "dayjs"
import {scheduleNew} from "../../services/schedule-new"
import { schedulesDay } from "../schedules/load"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")


//data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//carrega a data atual.
selectedDate.value = inputToday

//define a data mínima como sendo a atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
    //Previne o comportamento padrão
    event.preventDefault()

    try {

        //Recuperando o nome do cliente
        const name = clientName.value.trim()

        if(!name){
            return alert("Informe o nome do cliente!")
        }

        const hourSelected = document.querySelector(".hour-selected")

        if (!hourSelected) {
            return alert("Informe o horário do agendamento!")
        }

        //Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        //Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")
        //Gera um ID
        const id = new Date().getTime().toString();

        //Faz o agendamento
        await scheduleNew({
            id,
            name,
            when,
        })

        //Recarrega o agendamentos
        await schedulesDay()
        //lima nome do cliente
        clientName.value = ""

    } catch (error) {
        alert("não foi possível realizar o agendamento!")
    }
}