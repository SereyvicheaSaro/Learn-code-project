async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/lesson/');
      const data = await response.json();
      // Do something with the data
      console.log(data);
      const {title , description , code , answer} =data;
    } catch (error) {
      // Handle any errors that occur
      console.error(error);
    }
  }
  
  fetchData();