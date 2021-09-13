using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Sectors
{
    public class DeleteSector
    {
        public class Command : IRequest
        {
        public Guid SectorId{get; set;}
            
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
                
                var sector = await _context.Sector.FindAsync(request.SectorId);

                if(sector==null)
                
                throw new Exception("Could not find Sector");

                _context.Remove(sector);

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem with saving data");

            }
        }

    }
}