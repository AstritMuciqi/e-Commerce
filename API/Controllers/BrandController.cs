using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Brands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BrandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        
        public async Task<ActionResult<List<Brand>>> List()
        {
           return await _mediator.Send(new List.Query()); 
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Brand>> ProductDetails(Guid id)
        {
            return await _mediator.Send(new BrandDetails.Query{BrandId = id});
        }

         [HttpPost]

        public async Task<ActionResult<Unit>> CreateBrand(CreateBrand.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditBrand(Guid id,EditBrand.Command command)
        {
            command.BrandId = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> DeleteBrand(Guid id)
        {
            return await _mediator.Send(new DeleteBrand.Command{BrandId=id});
        }

    }
}