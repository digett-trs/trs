/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState } from "react"
import axios from "axios"
const MyForm = () => {
  var team = ""
  var lname = ""
  if (typeof window !== "undefined") {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    var team = urlParams.get("team")
    var lname = urlParams.get("lname")
  }
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
    team: team,
    lname: lname,
  })
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    })
    if (ok) {
      if (typeof window !== "undefined") {
        window.location.href = "/contact-thank-you"
      }
    }
  }
  const handleOnSubmit = e => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })
    axios({
      method: "post",
      url: "https://getform.io/f/876d17f4-71ab-4e91-8120-8c442089cd72",
      data: new FormData(form),
    })
      .then(r => {
        handleServerResponse(true, "Thanks!", form)
      })
      .catch(r => {
        handleServerResponse(false, r.response.data.error, form)
      })
  }
  return (
    <div>
      <div>
        {serverState.team && (
          <div>
            You are sending this message to
            <strong> {team + " " + lname} </strong>to inquire about
            <strong> Our Services</strong>
          </div>
        )}

        <form
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
          onSubmit={handleOnSubmit}
        >
          <label>Name*</label>
          <input type="text" required name="name" />
          <label>Email*</label>
          <input type="email" required name="email" />
          <label>Phone</label>
          <input type="phone" name="phone" />
          <label>Best Time to Call*</label>
          <select name="time" required>
            <option value="anytime">Anytime</option>
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="subscribe_to_newsletter" value="1" />
            <label>
              Yes, please sign me up to receive the Texas Ranches For Sale
              monthly e-Newsletter.
            </label>
          </div>

          <label>Please Select All That Apply Below:</label>
          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="agent_contact" value="1" />
            <label>
              I would like to know more about this property, please have an
              agent contact me directly
            </label>
          </div>
          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="appointment" value="1" />
            <label>
              I would like to make an appointment to view this property
            </label>
          </div>

          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="evaluation" value="1" />
            <label>
              I am interested in a current market evaluation of my property
            </label>
          </div>

          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="autoalerts" value="1" />
            <label>
              I would like to receive automatic email alerts when similar
              properties become available
            </label>
          </div>

          <div
            sx={{
              display: "flex",
            }}
          >
            <input type="checkbox" name="haveagent" value="1" />
            <label>I am currently working with a real estate agent</label>
          </div>
          <label>Comments</label>
          <textarea required name="comments" />
          <input type="hidden" name="team" value={serverState.team} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default MyForm
