using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Sectors
{
    public class CreateSector
    {
        public class Command : IRequest
        {
            public Guid SectorId{get; set;}
            public string SectorName{get; set;}
            
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context=context;   
            }
           

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var sectors = new Sector
                {
                    SectorId = request.SectorId,
                    SectorName = request.SectorName,
                };

                _context.Sector.Add(sectors); 
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}