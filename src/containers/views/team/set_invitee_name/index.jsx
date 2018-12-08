/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import EnterKytchAddressForm from './components/SetInviteeName';

class SetInviteeName extends PureComponent {

	onSubmit = (values) => {
		const { address } = values;
		this.props.history.push('/team/invitee_email_note');
	}
  render() {
    return (
			<div className="container">
				<div className="row">
					<div className="col-xl-6 offset-xl-3">
						<br/>
						<br/>
						<h2 className="heading text-center"><span className="gradient-blue">Enter your Kytch address.</span></h2>
						<EnterKytchAddressForm onSubmit={this.onSubmit}/>
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(SetInviteeName);