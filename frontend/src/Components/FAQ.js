import React, { Component } from "react";

export default class FAQ extends Component {
  render() {
    return (
      <div>
        <hr className="my-5" />
        <h2>Frequently Asked Questions</h2>
        <div className="my-2 py-2">
          <h5>What is this tool?</h5>
          <p>
            IntruderWatch is a free tool, using which you can create a tracker
            and hide the tracker with your important files with an eye catchy
            filename like "My Passwords". If your system will ever be
            compromised and some attacker will try to access your important
            files then the attacker will definately open this file and you will
            get an alert through email with the details of the attacker.
          </p>
        </div>
        <div className="my-2 py-2">
          <h5>How to use it?</h5>
          <p>
            1. Create a Tracker on <a href="/home">Create Tracker Page</a>. Once the
            tracker is created you will be redirected to Tracker Dashboard.
            <br />
            2. Now click on the Download button and download the tracker in HTML
            format.
            <br />
            3. The downloaded file is named "My Passwords.html". This is insure
            that the file looks juicy to any attacker. You can rename the file
            to any relevant name you want.
            <br />
            4. Move the file to your Personal Folder or a folder you want to
            secure.
            <br />
            5. Optionally, you can save the Secret Link shown in the dashboard
            some where to view tracker statistics.
            <br />
            6. Whenever you system will be compromised you will receive an alert
            email. The email will have the IP details of the attacker and also
            your secret link to open the Tracker dashboard.
          </p>
        </div>
        <div className="my-2 py-2">
          <h5>How does the tracker work?</h5>
          <p>
            Once you setup the tracker, When ever your system will be
            compromised or hacked. Then the hacker or unauthorized person will
            try to find juicy data in your storage. File's with names like "My
            Passwords" , "secret" are easy targets. When the file will be
            opened, you will be alerted with the IP Address and location details
            of the attacker.
          </p>
        </div>
        <div className="my-2 py-2">
          <h5>What if I still understand nothing?</h5>
          <p>
            The tool is based on the concept of "Canary Token". You can google
            it up to know a lot more about it.
          </p>
        </div>
        <div className="my-2 py-2">
          <h5>What are the Future plans?</h5>
          <p>
            1. Add Client Side as well as Server Side Input Validations.
            <br />
            2. Improve the User Interface. <br />
            3. Add more formats for the tracker file like exe, xls, doc, etc.
          </p>
        </div>
      </div>
    );
  }
}
