import { keysToCamel, valuesToNumber } from './objectUtil.js'
import { assertEquals } from '../deps.js'

Deno.test({
  name: "keysToCamel does turn all keys of a given object to camelCase", 
  fn() {
    const cameledObj = keysToCamel({ 
      one_prop: '1',
      two_prop: '2'
    })

    assertEquals(Object.keys(cameledObj).length, 2)
    assertEquals(Object.keys(cameledObj)[0], 'oneProp')
    assertEquals(Object.keys(cameledObj)[1], 'twoProp')
  },
  sanitizeResources: false,
  sanitizeOps: false
});


Deno.test({
  name: "keysToCamel preserves values of the properties", 
  fn() {
    const cameledObj = keysToCamel({ 
      one_prop: '1',
      two_prop: '2'
    })

    assertEquals(cameledObj.oneProp, '1')
    assertEquals(cameledObj.twoProp, '2')
  },
  sanitizeResources: false,
  sanitizeOps: false
});


Deno.test({
  name: "valuesToNumber turns all properties to type Number", 
  fn() {
    const obj = valuesToNumber({ 
      one_prop: '1',
      two_prop: '2'
    })

    assertEquals(obj.one_prop, 1)
    assertEquals(obj.two_prop, 2)
  },
  sanitizeResources: false,
  sanitizeOps: false
});
