using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ContactForms
{
    public class ContactFormList
    {
        public class Query : IRequest<List<ContactForm>> { }

        public class Handler : IRequestHandler<Query, List<ContactForm>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<ContactForm>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contactforms = await _context.ContactForm.ToListAsync();

                return contactforms;
            }
        }
    }
}