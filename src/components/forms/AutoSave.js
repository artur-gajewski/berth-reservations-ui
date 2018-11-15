import React from 'react';
import { FormSpy } from 'react-final-form';
import diff from 'object-diff';

class AutoSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: props.values, submitting: false };
  }

  componentWillReceiveProps() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.save, this.props.debounce);
  }

  save = async () => {
    if (this.promise) {
      await this.promise;
    }
    const { values, save } = this.props;

    const difference = diff(this.state.values, values);
    if (Object.keys(difference).length) {
      this.setState({ submitting: true, values });
      this.promise = save(difference);
      await this.promise;
      delete this.promise;
      this.setState({ submitting: false });
    }
  };

  render() {
    return this.state.submitting && <div className="submitting">Submitting...</div>;
  }
}
export default props => <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />;
