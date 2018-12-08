/* eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

export default class TeamSetupPoint2 extends PureComponent {

  state = {
    toggle: false,
  }

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {
    return (
      <Fragment>
        <main>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <br/>
                <br/>
                <h6 className="heading text-uppercase">Full Access</h6>
                <ul className="ul-team-list">
                  <li>
                    <div className="team-item">
                      <div className="wrapper has-icon color-black">
                        <span className="icon-wrapper icon-wrapper-left round-icon bg-gradient-dark"><i className="icon-32 icon-account-white pull-down"></i></span>
                        <span className="text-wrapper">You</span>
                      </div>
                      <button type="button" className="btn btn-flat has-icon color-grey" data-toggle="modal" data-target="#modalYourName" onClick={this.toggle}>
                        <span className="text-wrapper">Owner</span><i className="icon icon-angle-right-grey icon-right"></i>
                      </button>
                    </div>
                  </li>
                </ul>
                <div className="box padded bordered-top bordered-bottom bg-color-lightest-grey">
                  <p className="mb-0">Invite your team members to join your home with their own Kytch Accounts. They'll have full access to view, control, add or remove products. They'll also be able to participate in Kytch Assist, view history, and get their own copies of the monthly Kytch Report. </p>
                </div>
                <div className="button-wrapper mt-4">
                  <Link className="has-icon color-black" to="/team/invitee_name">
                    <span className="icon-wrapper icon-wrapper-left round-icon bg-gradient-blue"><i className="icon-32 icon-plus-white"></i></span>
                    <span className="text-wrapper">Add a person</span>
                  </Link>
                </div>
                <hr/>
                <br/>
                <br/>
              </div>
            </div>
          </div>
        </main>
        <Modal isOpen={this.state.toggle} toggle={this.toggle} centered fade backdrop="static">
          <ModalHeader tag="div" toggle={this.toggle} className="border-0">
            <h5 className="color-black mx-auto" id="modalLabelYourName">What's your name</h5>
          </ModalHeader>
          <ModalBody>
            <p>To invite people to your Kytch, add your name to your account so others can see who you are.</p>
            <form className="">
              <div className="form-group is-valid">
                <input type="text" className="form-control" defaultValue="Alex"/>
                <span className="add-burst-on-input-focus"></span>
              </div>
              <div className="button-wrapper text-center">
                <button type="button" className="btn btn-primary text-uppercase">Save</button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-flat">Use phone</button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
