import React, { useState, useEffect } from 'react';


export const authtoken = localStorage.getItem("token")

export const headers =  {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${authtoken}`
  }

  // http://127.0.0.1:8000/admin/get-student-attendance?student_id=R200382&year=E3
