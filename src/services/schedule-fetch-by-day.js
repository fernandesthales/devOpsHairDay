import dayjs from "dayjs"
import { apiConfig } from "./api-config.js"

export async function scheduleFetchByDay({date}){
    try {

        //Fazendo a requisição
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        //converte para JSON.
        const data = await response.json()

        //Filtra os resultados pela data
        const dailySchedules = data.filter((schedule) => 
            dayjs(date).isSame(schedule.when, "day")
        )

        return dailySchedules

    } catch (error) {
        alert("Não foi possível buscar os agendamentos do dia selecionado")
    }
}