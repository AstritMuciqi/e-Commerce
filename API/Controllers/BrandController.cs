using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Brands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class BrandController : BaseController
    {
      
        
        [HttpGet]
        
        public async Task<ActionResult<List<Brand>>> List()
        {
           return await Mediator.Send(new List.Query()); 
        }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<ActionResult<Brand>> ProductDetails(Guid id)
        {
            return await Mediator.Send(new BrandDetails.Query{BrandId = id});
        }

         [HttpPost]

        public async Task<ActionResult<Unit>> CreateBrand(CreateBrand.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditBrand(Guid id,EditBrand.Command command)
        {
            command.BrandId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Unit>> DeleteBrand(Guid id)
        {
            return await Mediator.Send(new DeleteBrand.Command{BrandId=id});
        }

    }
}