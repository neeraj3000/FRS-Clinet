import React, { useState, useEffect } from 'react';


export const authtoken = localStorage.getItem("token")

export const headers =  {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${authtoken}`
  }
