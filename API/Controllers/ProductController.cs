using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Products;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        
        public async Task<ActionResult<List<Product>>> List()
        {
           return await _mediator.Send(new List.Query()); 
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> ProductDetails(Guid id)
        {
            return await _mediator.Send(new ProductDetails.Query{ProductId = id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> ProductCreate(ProductCreate.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditProduct(Guid id,EditProduct.Command command)
        {
            command.ProductId = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> DeleteProduct(Guid id)
        {
            
            return await _mediator.Send(new DeleteProduct.Command{ProductId=id});
        }
    }
}