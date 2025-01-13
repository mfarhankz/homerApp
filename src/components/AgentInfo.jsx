import React from 'react';
import { Mail, Phone } from 'lucide-react';

const AgentInfo = ({
  photo,
  firstName,
  lastName,
  emailAddress,
  brokerageName,
  phone
}) => {
  const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex items-start gap-4 p-2">
      {/* Left side - Image */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-500 flex items-center justify-center  text-3xl font-semibold">
              {firstLetter}
            </div>
          )}
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex flex-col items-start">
        {/* Name */}
        <h3 className="text-2xl font-semibold">
          {firstName} {lastName}
        </h3>
        <span className="text-sm ">{brokerageName}</span>

        {/* Contact Info - Only shown if provided */}
        {(emailAddress || phone) && (
          <div className="flex flex-col gap-2 mt-2">
            {emailAddress && (
              <div className="flex items-center">
                <Mail size={18} className="mr-2 " />
                <span className="text-base ">{emailAddress}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span className="text-base">{phone}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentInfo;
