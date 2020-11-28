import { getSummary } from "../../services/summaryService.js"
import { getDateRangeOfWeek, getMonthRange } from '../../utils/dateUtil.js'

const showSummary = async ({ render, request, response, session }) => {
  const params = request.url.searchParams

  const user = await session.get('user')

  const week = params.get('week').split('-')[1].slice(1);
  const month = params.get('month').split('-')[1];
  const year = params.get('week').split('-')[0]

  const weekRange = getDateRangeOfWeek(Number(week), Number(year))
  const monthRange = getMonthRange(new Date(month))

  console.log(weekRange, monthRange)

  const weekSummary = await getSummary(user.id, weekRange[0], weekRange[1])
  const monthSummary = await getSummary(user.id, monthRange[0], monthRange[1])

  console.log(weekSummary, monthSummary)
}

const postSummaryQuery = ({ render, request, response, session }) => {

}

export { showSummary, postSummaryQuery }

