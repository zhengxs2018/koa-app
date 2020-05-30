// @ts-ignore
import Parameter from 'parameter'

const parameter = new Parameter({
  validateRoot: true,
})

export default {
  validate: parameter.validate.bind(parameter),
}
