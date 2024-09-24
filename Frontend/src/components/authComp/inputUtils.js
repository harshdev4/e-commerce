export const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    
    if (name === 'mobileNo') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setState(prevData => ({
        ...prevData,
        [name]: numericValue.slice(0, 10)
      }));
    } else {
      setState(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
};
  