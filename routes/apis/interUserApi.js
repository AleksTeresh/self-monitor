import { getAverages as getAveragesFromDB } from '../../services/interUserService.js'
import { formatDate } from '../../utils/dateUtil.js'

const getAverages = async({request, response}) => {
  const today = new Date()
  const weekAgo = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)
  const averages = await getAveragesFromDB(weekAgo.toDateString(), today.toDateString()) 
  console.log(averages)
  response.body = averages;
};

const getAveragesForDay = async({request, response, params}) => {
  const queryDay = new Date(`${params.year}-${params.month}-${params.day}`)
  const averages = await getAveragesFromDB(queryDay.toDateString(), queryDay.toDateString())
  response.body = averages && averages[formatDate(queryDay)];
};

export { getAverages, getAveragesForDay }
