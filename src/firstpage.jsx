import { useEffect, useState } from "react"

const Category=()=>{
    const [cname,setcname]=useState();
    const [pic,setpic]=useState();
    const [cdata,setcdata]=useState([]);

    useEffect(()=>{
        loadcat();
    },[]);

    const savecat=async()=>{
        var fdata=new FormData();
        fdata.append("catname",cname);
        fdata.append("cpic",pic);
        const r=await fetch("http://localhost:7000/category",{
            method:"POST",
            body:fdata    
        });
        const data=await r.json();
        alert(data.msg);
        loadcat();
    }

    const loadcat=async()=>{
        const r=await fetch("http://localhost:7000/category",{
          method:"GET"  
        });
        const data=await r.json();
        setcdata(data);
        
    }
    return(
        <>
            <div className="container-fluid bg-success text-light">
                <div className="row">
                    <div className="col-2">
                        <h1>ShopWeb</h1>
                        <ul>
                            <li>Category</li>
                            <li>Sub Category</li>
                            <li>Product</li>
                            <li>View Order</li>
                        </ul>
                    </div>
                    <div className="col-10">
                        <div className="text-end p-2">Logout</div>
                        <div className="text-end p-2">
                            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mycat">New Category</button>
                        </div>
                        
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Pic</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cdata.map((x)=>{
                                        return(
                                            <tr>
                                                <td>{x.catname}</td>
                                                <td><img src={"http://localhost:7000/catpics/"+x.catpic} style={{width:"100px"}} /></td>
                                                <td>Edit Delete</td>
                                            </tr>
                                        )
                                    })   
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* modal start */}
                <div className="modal" id="mycat">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>New Category</h4>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Category Name</label>
                                    <input type="text" className="form-control" onChange={(e)=>{setcname(e.target.value)}} />
                                </div>
                                <div className="form-group">
                                    <label>Pic</label>
                                    <input type="file" className="form-control" onChange={(e)=>{setpic(e.target.files[0])}} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={savecat}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* modal end */}
        </>
    )
}
export default Category