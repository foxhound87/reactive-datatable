import MobxReactForm from 'mobx-react-form';

export default class Form extends MobxReactForm {

  hooks() {
    return {
      onError() {
        // eslint-disable-next-line
        console.error({
          errors: this.errors(),
          values: this.values(),
        });
      },

    };
  }
}
