using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Sectors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectorController : ControllerBase
    {
       private readonly IMediator _mediator;

        public SectorController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        
        public async Task<ActionResult<List<Sector>>> List()
        {
           return await _mediator.Send(new List.Query()); 
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Sector>> SectorDetails(Guid id)
        {
            return await _mediator.Send(new SectorDetails.Query{SectorId=id});
        }

        [HttpPost]

        public async Task<ActionResult<Unit>> CreateSector(CreateSector.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditSector(Guid id,EditSector.Command command)
        {
            command.SectorId = id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteSector(Guid id)
        {
            return await _mediator.Send(new DeleteSector.Command{SectorId=id});
        }
    }
}

