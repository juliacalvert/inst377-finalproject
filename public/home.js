function personInfo() {
    const apiUrl = 'https://api.fbi.gov/wanted/v1/list';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const items = data.items;
        items.forEach(person => {
          console.log('Name:', person.title);
          console.log('Description of Crime:', person.description);
          console.log('Caution:', person.caution);
          console.log('Image:', person.images[0]?.original || 'No image');
          console.log('<br>');
      });
    })
}
  
window.onload = personInfo;