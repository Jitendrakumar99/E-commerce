import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// const usStates = [
//   'Alabama',
//   'Alaska',
//   'Arizona',
//   'Arkansas',
//   'California',
//   'Colorado',
//   'Connecticut',
//   'Delaware',
//   'Florida',
//   'Georgia',
// ];

const EditItem = () => {
  const [data,setData]=useState([ ]);
  const [validationErrors, setValidationErrors] = useState({});
  useEffect(() => {
    const fetchData= async()=>{
        try{
           const res= await axios.get('https://e-commerce-backend-czqd.onrender.com/getalldata')
           console.log(res.data);
           setData(res.data)
        }
        catch(error){
      console.log(error);
        }
    }
    fetchData()
  }, [])
  
  // createdAt: 1,
  // _id:1,
  // title:1,
  // description:1,
  // category:1,
  // price:1,
  // discountPercentage:1,
  // rating:1,
  // stock:1,
  // brand:1,
  // sku:1,
  // weight:1,
  // warrantyInformation:1,
  // shippingInformation:1,
  // availabilityStatus:1,
  // returnPolicy:1,
  // tags:1,
  // dimensions:1,
  // images:1

  const columns = useMemo(
    () => [
      {
        accessorKey: 'number',
        header: 'S.N.',
        enableEditing: false,
        size: 80,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: '_id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: 'category',
        header: 'Category',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              category: undefined,
            }),
        },
      },
      {
        accessorKey: 'price',
        header: 'Price',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.price,
          helperText: validationErrors?.price,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              price: undefined,
            }),
        },
      },
      {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.discountPercentage,
          helperText: validationErrors?.discountPercentage,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              discountPercentage: undefined,
            }),
        },
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.rating,
          helperText: validationErrors?.rating,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              rating: undefined,
            }),
        },
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.stock,
          helperText: validationErrors?.stock,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              stock: undefined,
            }),
        },
      },
      {
        accessorKey: 'brand',
        header: 'Brand',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.brand,
          helperText: validationErrors?.brand,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              brand: undefined,
            }),
        },
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.sku,
          helperText: validationErrors?.sku,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              sku: undefined,
            }),
        },
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.weight,
          helperText: validationErrors?.weight,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              weight: undefined,
            }),
        },
      },
      {
        accessorKey: 'warrantyInformation',
        header: 'Warranty Information',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.warrantyInformation,
          helperText: validationErrors?.warrantyInformation,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              warrantyInformation: undefined,
            }),
        },
      },
      {
        accessorKey: 'shippingInformation',
        header: 'Shipping Information',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.shippingInformation,
          helperText: validationErrors?.shippingInformation,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              shippingInformation: undefined,
            }),
        },
      },
      {
        accessorKey: 'availabilityStatus',
        header: 'Availability Status',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.availabilityStatus,
          helperText: validationErrors?.availabilityStatus,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              availabilityStatus: undefined,
            }),
        },
      },
      {
        accessorKey: 'returnPolicy',
        header: 'Return Policy',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.returnPolicy,
          helperText: validationErrors?.returnPolicy,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              returnPolicy: undefined,
            }),
        },
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        Cell:({row})=>{
          const tags1=row.original.tags[0];
          const tags2=row.original.tags[1];

          return(
          
              <div className="" style={{display:'flex',flexDirection:'column'}}>
                <div>{tags1}</div>
                <div>{tags2}</div>
              </div>
           
          )

        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.tags,
          helperText: validationErrors?.tags,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              tags: undefined,
            }),
        },
      },
      {
        accessorKey: 'dimensions',
        header: 'Dimensions',
        enableEditing: false,
        Cell:({row})=>{
          const dimensions=row.original.dimensions;
          return(
            <div className="" style={{display:'flex',flexDirection:'column'}}>
              
                width : {dimensions['width']} ,
                height: {dimensions['height']},
                depth : {dimensions['depth']}
              
            </div>
          );
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.dimensions,
          helperText: validationErrors?.dimensions,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              dimensions: undefined,
            }),
        },
      },
      {
        accessorKey: 'images',
        header: 'Images',
        Cell: ({ row }) => {
          const imageUrl1 = row.original.images[0]; 
          const imageUrl2 = row.original.images[1]; 
          const imageUrl3 = row.original.images[2]; 
      
          return (
            <>
            <div
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                borderRadius: '5px',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(2)'; // Scale up on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Reset scale on hover-out
              }}
            >
              <img
                src={imageUrl1}
                alt="Product"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                }}
              />
             
            </div>
            <div
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                borderRadius: '5px',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(2)'; // Scale up on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // Reset scale on hover-out
              }}
            >
              <img
                src={imageUrl2}
                alt="Product"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                }}
              />
             
            </div>
            <div
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                borderRadius: '5px',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(2)'; 
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; 
              }}
            >
              <img
                src={imageUrl3}
                alt="Product"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                }}
              />
             
            </div>
            </>
            
          );
        },
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.images,
          helperText: validationErrors?.images,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              images: undefined,
            }),
        },
      }
      
      
    ],
    [validationErrors]
  );
  
  const handleCreateUser = ({ values, table }) => {
    const newId = data.length + 1;
    setData([...data, { ...values, id: newId }]);
    table.setCreatingRow(null);
  };

  const handleSaveUser = async ({ values, table }) => {
    const updatedData = {
      ...values,
      images:Array.isArray(values.images) 
      ? values.images :values.images.split(',').map((url) => url.trim()),
      tags:Array.isArray(values.tags) 
      ? values.tags :values.tags.split(',').map((tag)=>tag.trim()),
      
    };
    try {
      await axios.put(`https://e-commerce-backend-czqd.onrender.com/updataproduct`, updatedData); 
      setData(data.map((row) => (row._id === values._id ? values : row)));
      table.setEditingRow(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  const handleDeleteUser = async (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        console.log(row.original._id);
        const _id=row.original._id
        await axios.delete('https://e-commerce-backend-czqd.onrender.com/deleteProduct',{data: { _id },});
        setData(data.filter((user) => user._id !== row.original._id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row._id,
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
   
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
     <div className='' style={{padding:'2px'}}>
         <p style={{fontSize:"20px"}}>Product Table</p>
     </div>
    ),
  });

  return  (
    <div className="" style={{left:'0px',width:'100%'}}>

      <MaterialReactTable table={table} />
    </div>
  );
  
};

export default EditItem;
