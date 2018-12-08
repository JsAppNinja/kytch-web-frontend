/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import InvitationForm from './components/InvitationForm';

class SetInviteeEmailAndNote extends PureComponent {

	onSubmit = (values) => {
		console.log(values);
		const { email, note } = values;
		this.props.history.push('/team/account_list');
	}

  render() {
    return (
			<div className="container">
				<div className="row">
					<div className="col-xl-6 offset-xl-3">
						<br/>
						<br/>
						<h2 className="heading text-center"><span className="gradient-blue">Send invitation</span></h2>
						<p className="text-center">Kytch will send an email inviting Michael to add this home to their Kytch Account.
						<br/><a href="#">Add from contacts</a></p>
						<InvitationForm onSubmit={this.onSubmit} />
					</div>
				</div>
			</div>
    );
  }
}

export default withRouter(SetInviteeEmailAndNote);
