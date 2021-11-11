using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    
    public class ProductController : BaseController
    {
       
        
        // [HttpGet]
        
        // public async Task<ActionResult<List<Product>>> List()
        // {
        //    return await Mediator.Send(new List.Query()); 
        // }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<ActionResult<Product>> ProductDetails(Guid id)
        {
            return await Mediator.Send(new ProductDetails.Query{ProductId = id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> ProductCreate(ProductCreate.Command command)
        {
            return await Mediator.Send(command);
        }

        // [HttpPut("{id}")]
        // public async Task<ActionResult<Unit>> EditProduct(Guid id,EditProduct.Command command)
        // {
        //     command.ProductId = id;
        //     return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> DeleteProduct(Guid id)
        {
            
            return await Mediator.Send(new DeleteProduct.Command{ProductId=id});
        }
    }
}