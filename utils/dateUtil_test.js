import { formatDate, getWeek } from './dateUtil.js'
import { assertEquals } from '../deps.js'

Deno.test({
  name: "formatDate works correctly when both day and month are < 10", 
  fn() {
    const string = formatDate(new Date('2017-01-01'))
    assertEquals(string, '2017-01-01')
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "formatDate works correctly when both day and month are > 10", 
  fn() {
    const string = formatDate(new Date('2017-12-30'))
    assertEquals(string, '2017-12-30')
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "getWeek returns week number for 2020-12-10", 
  fn() {
    const weekNumber = getWeek(new Date('2020-12-10'))
    assertEquals(weekNumber, 50)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "getWeek returns week number for 2020-12-31", 
  fn() {
    const weekNumber = getWeek(new Date('2020-12-31'))
    assertEquals(weekNumber, 53)
  },
  sanitizeResources: false,
  sanitizeOps: false
});


Deno.test({
  name: "getWeek returns week number for 2020-01-01", 
  fn() {
    const weekNumber = getWeek(new Date('2020-01-01'))
    assertEquals(weekNumber, 1)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

Deno.test({
  name: "getWeek returns week number for 2021-01-01 as week 53", 
  fn() {
    const weekNumber = getWeek(new Date('2021-01-01'))
    assertEquals(weekNumber, 53)
  },
  sanitizeResources: false,
  sanitizeOps: false
});


Deno.test({
  name: "getWeek returns week number for 2021-01-04 as week 1", 
  fn() {
    const weekNumber = getWeek(new Date('2021-01-04'))
    assertEquals(weekNumber, 1)
  },
  sanitizeResources: false,
  sanitizeOps: false
});

