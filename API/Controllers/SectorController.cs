using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Sectors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class SectorController : BaseController
    {
     
        
        [HttpGet]
        
        public async Task<ActionResult<List<Sector>>> List()
        {
           return await Mediator.Send(new List.Query()); 
        }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<ActionResult<Sector>> SectorDetails(Guid id)
        {
            return await Mediator.Send(new SectorDetails.Query{SectorId=id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> CreateSector(CreateSector.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditSector(Guid id,EditSector.Command command)
        {
            command.SectorId = id;
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteSector(Guid id)
        {
            return await Mediator.Send(new DeleteSector.Command{SectorId=id});
        }
    }
}

