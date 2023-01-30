import React, { useState } from "react"
import Page from "./Page"
export default function Home() {
  return (
    <>
      <Page container={false} nav={true} title="home">
        <div width="100%" className="flex relative">
          <img
            src="https://img.freepik.com/free-photo/front-view-burger-with-egg-copy-space_23-2148678844.jpg?w=826&t=st=1675038838~exp=1675039438~hmac=9af0bf3d5601b44ee4b58c01b974546ec8d76e4f680d54b9b0339556c0944892"
            width="100%"
            alt=""
          />
        </div>
      </Page>
    </>
  )
}
